#include "similarity.h"
#include "../../../abycore/circuit/booleancircuits.h"
#include "../../../abycore/sharing/sharing.h"


int32_t test_similarity_circuit(e_role role, const std::string& address, uint16_t port, seclvl seclvl,
		uint32_t bitlen, uint32_t nthreads, e_mt_gen_alg mt_alg, e_sharing sharing){
	std::array<float,51> values;
	float distance = 0;
	std::string input,habit,num;
	habit.clear();
	num.clear();
	std::cout<<"Input:"<< std::endl;
	uint64_t outside, in;
	std::cin >> outside >> in;
	ABYParty* party = new ABYParty(role, address, port, seclvl, bitlen, nthreads, mt_alg);			
	std::vector<Sharing*>& sharings = party->GetSharings();
	Circuit* circ = sharings[sharing]->GetCircuitBuildRoutine();
	share *s_server, *s_client, *s_distance1, *s_distance2, *s_out;
	share *s_outside = circ-> PutSharedINGate( outside, bitlen );
	if(role == SERVER)
	{
			s_server = circ->PutINGate(in, bitlen, SERVER);
			s_client = circ->PutDummyINGate(bitlen);
	}
	else
	{
			s_client = circ->PutINGate(in, bitlen, CLIENT);
			s_server = circ->PutDummyINGate(bitlen);
	}
	
	s_out = BuildSimilarityCircuit(s_client, s_server, s_outside, (BooleanCircuit*) circ);
	s_out = circ->PutOUTGate(s_out,ALL);
	
	party->ExecCircuit();
	
	uint32_t *ans_value = (uint32_t*) s_out->get_clear_value_ptr();
	
	
	std::cout << *ans_value << std::endl;

	float ans = *((float*) ans_value);
	std::cout << ans << std::endl;
	return 0;
}

share* BuildSimilarityCircuit(share *s_client, share *s_server, share *s_outside, BooleanCircuit *bc) {

	share *out;
	out = bc->PutADDGate(s_client,s_server);
	out = bc->PutADDGate(out,s_outside);
	std::cout << *((uint64_t*)bc->PutSharedOUTGate(out)) << std::endl;
	return out;
}
