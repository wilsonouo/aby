
add_executable(shareoutput shareOutPut.cpp common/shareOutPut.cpp)
target_link_libraries(shareoutput ABY::aby ENCRYPTO_utils::encrypto_utils)
