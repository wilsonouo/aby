
add_executable(new_similarity_test new_similarity_test.cpp common/new_similarity.cpp)
target_link_libraries(new_similarity_test ABY::aby ENCRYPTO_utils::encrypto_utils)
