import sys
import re
from copy import deepcopy
from math import gcd
from collections import defaultdict, Counter, deque
D = """???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1"""
L = D.split('\n')
G = [[c for c in row] for row in L]
print(L)
print(G)
def is_valid (dots, blocks):
    current = 0
    seen = []
    for c in dots:
        if c=='.':
            if current > 0:
                seen.append(current)
            current=0
        elif c=='#':
            current += 1
        else:
            print(c)
            assert False
    if current>0:
        seen.append(current)
    return seen == blocks

def f(dots, blocks, i):
    if i==len(dots):
        return 1 if is_valid(dots, blocks) else 0
    if dots[i]=='?':
        return (f(dots[:i]+'#'+dots[i+1:], blocks, i+1) +
        f(dots[:i]+'.'+dots[i+1:], blocks, i+1))
    else:
        return f(dots, blocks, i+1)

ans = 0
for line in L:
    dots, blocks = line.split()
    blocks = [int(x) for x in blocks.split(',')]
    score = f(dots, blocks, 0)
    print(dots, blocks, score)
    ans += score
print(ans)