#ifndef __BID_H_
#define __BID_H_

#include "../../../abycore/circuit/booleancircuits.h"
#include "../../../abycore/circuit/arithmeticcircuits.h"
#include "../../../abycore/circuit/circuit.h"
#include "../../../abycore/aby/abyparty.h"
#include <math.h>
#include <cassert>
#include<bits/stdc++.h>

#define ALICE 	"ALICE"
#define BOB 	"BOB"

/**
 \param		role 		role played by the program which can be server or client part.
 \param 	address 	IP Address
 \param 	seclvl 		Security level
 \param 	bitlen		Bit length of the inputs
 \param 	nthreads	Number of threads
 \param		mt_alg		The algorithm for generation of multiplication triples
 \param 	sharing		Sharing type object
 \brief		This function is used for running a testing environment for solving the
 millionaire's problem
 */
int32_t test_similarity_circuit(e_role role, const std::string& address, uint16_t port, seclvl seclvl,
		uint32_t bitlen, uint32_t nthreads, e_mt_gen_alg mt_alg, e_sharing sharing, std::array<uint32_t,52> SI, std::array<uint32_t,52> CI);

/**
 \param		s_alice		shared object of alice.
 \param		s_bob 		shared object of bob.
 \param		bc	 		boolean circuit object.
 \brief		This function is used to build and solve the millionaire's problem.
 */
share* BuildSimilarityCircuit(share **s_vector1, share **s_vector2, share *s_distance1, share *s_distance2, BooleanCircuit *bc);


#endif /* __MILLIONAIREPROB_H_ */
