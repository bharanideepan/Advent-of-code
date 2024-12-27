def get_output(A):
    B = A%8
    B=B^2
    B=B^(A>>B)
    B=B^7
    A=A>>3
    return B%8

print(get_output(0))

A=0
possible_value=[0]
for p in reversed([2,4,1,2,7,5,4,3,0,3,1,7,5,5,3,0]):
    new_possible_value = []
    for pp in possible_value:
        for i in range(8):
            number = (pp*8)+i
            output=get_output(number)
            if  p == output:
                new_possible_value.append(number)
        possible_value = new_possible_value[:]
print(possible_value)
# 190384609508367