#include <ENCRYPTO_utils/crypto/crypto.h>
#include <ENCRYPTO_utils/parse_options.h>
//ABY Party class
#include "../../abycore/aby/abyparty.h"

#include "common/new_similarity.h"

int32_t read_test_options(int32_t* argcp, char*** argvp, e_role* role,
		uint32_t* bitlen, uint32_t* nvals, uint32_t* secparam, std::string* address,
		uint16_t* port, std::string* s, std::string* c) {

	uint32_t int_role = 0, int_port = 0;

	parsing_ctx options[] =
			{ { (void*) &int_role, T_NUM, "r", "Role: 0/1", true, false }, {
					(void*) nvals, T_NUM, "n",
					"Number of parallel operation elements", false, false }, {
					(void*) bitlen, T_NUM, "b", "Bit-length, default 32", false,
					false }, { (void*) secparam, T_NUM, "s",
					"Symmetric Security Bits, default: 128", false, false }, {
					(void*) address, T_STR, "a",
					"IP-address, default: localhost", false, false }, {
					(void*) &int_port, T_NUM, "p", "Port, default: 7766", false,
					false },{ (void*) s, T_STR, "v", "Number of value", true, false },{ (void*) c, T_STR, "c", "Number of value", true, false }, };

	if (!parse_options(argcp, argvp, options,
			sizeof(options) / sizeof(parsing_ctx))) {
		print_usage(*argvp[0], options, sizeof(options) / sizeof(parsing_ctx));
		std::cout << "Exiting" << std::endl;
		exit(0);
	}

	assert(int_role < 2);
	*role = (e_role) int_role;

	if (int_port != 0) {
		assert(int_port < 1 << (sizeof(uint16_t) * 8));
		*port = (uint16_t) int_port;
	}

	//delete options;

	return 1;
}

int main(int argc, char** argv) {

	e_role role;
	uint32_t bitlen = 32, nvals = 31, secparam = 128, nthreads = 1;
	uint16_t port = 7766;
	std::string address = "127.0.0.1";
	int32_t test_op = -1;
	e_mt_gen_alg mt_alg = MT_OT;
	std::string server_input,client_input,num;
	std::array<uint32_t,52> SI,CI;
	read_test_options(&argc, &argv, &role, &bitlen, &nvals, &secparam, &address, &port,&server_input, &client_input);
	
	seclvl seclvl = get_sec_lvl(secparam);
	//std::cout << client_input << "\n";
	int i = 0,j = 0;
	while(server_input[i] != '\0')
	{
		if(server_input[i] == ',')
		{
			num += '\0';
			SI[j] = std::stoul(num);
			num.clear();
			i++;
			j++;
		}
		num += server_input[i];
		i++;
	}
	num += '\0';
	SI[j] = std::stoul(num);
	num.clear();
	
	i = 0;
	j = 0;
	while(client_input[i] != '\0')
	{
		if(client_input[i] == ',')
		{
			num += '\0';
			CI[j] = std::stoul(num);
			num.clear();
			i++;
			j++;
		}
		num += client_input[i];
		i++;
	}
	num += '\0';
	CI[j] = std::stoul(num);
	num.clear();
	
	test_similarity_circuit(role, address, port, seclvl, 32, nthreads, mt_alg, S_BOOL,SI,CI);

	return 0;
}

