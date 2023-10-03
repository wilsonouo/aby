#include "new_similarity.h"
#include "../../../abycore/circuit/booleancircuits.h"
#include "../../../abycore/sharing/sharing.h"

int32_t test_similarity_circuit(e_role role, const std::string& address, uint16_t port, seclvl seclvl, uint32_t bitlen, uint32_t nthreads, e_mt_gen_alg mt_alg, e_sharing sharing, std::array<uint32_t,52> customerA, std::array<uint32_t,52> customerB){
	
	

	// set the aby environment
	ABYParty* party = new ABYParty(role, address, port, seclvl, bitlen, nthreads, mt_alg);			
	std::vector<Sharing*>& sharings = party->GetSharings();
	BooleanCircuit* bc = (BooleanCircuit*) sharings[sharing]->GetCircuitBuildRoutine();

	// push shared value in circuit
	share *s_customerA[51], *s_customerB[51];

	// customerA
	for(int i = 0;i < 51;i++){
		s_customerA[i] = bc->PutSharedINGate(customerA[i], bitlen);
	}

	// customerB
	for(int i = 0;i < 51;i++){
		s_customerB[i] = bc->PutSharedINGate(customerB[i], bitlen);
	}

	share* s_out;
	// execution

	s_out = BuildSimilarityCircuit(s_customerA, s_customerB, s_customerA[50], s_customerB[50], bc);
	s_out = bc->PutOUTGate(s_out,ALL);
	
	party->ExecCircuit();
		
	uint32_t *ans_value = (uint32_t*) s_out->get_clear_value_ptr();

	// output
	float ans = *((float*) ans_value);
	if(role == SERVER){
		std::cout << ans << std::endl;
	}
	delete party;
	return 0;
}

share* BuildSimilarityCircuit(share **s_vector1, share **s_vector2, share *s_distance1, share *s_distance2, BooleanCircuit *bc) {

	share *s_innerProduct_value, *s_innerProduct_mul[50], *out;
	s_innerProduct_mul[0] = bc->PutFPGate(s_vector1[0],s_vector2[0], MUL);
	s_innerProduct_mul[1] = bc->PutFPGate(s_vector1[1],s_vector2[1], MUL);
	s_innerProduct_value = bc->PutFPGate(s_innerProduct_mul[0],s_innerProduct_mul[1],ADD);
	for(int i = 2 ; i < 50 ; i++)
	{
		s_innerProduct_mul[i] = bc->PutFPGate(s_vector1[i],s_vector2[i], MUL);
		s_innerProduct_value = bc->PutFPGate(s_innerProduct_value,s_innerProduct_mul[i], ADD);
	}
	out = bc->PutFPGate(s_innerProduct_value,s_distance1,DIV);
	out = bc->PutFPGate(out,s_distance2,DIV);
	return out;
}
