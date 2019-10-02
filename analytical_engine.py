import os
import sys
import json
import constant
import validator as valid


def execute():
    global runup
    if op == 0:
        ans = mill[1] + mill[2]
        if ans >= constant.MAX_NUMBER or ans < 0:
            runup = True
            mill[3] = mill[4] = 0
            mill[0] = mill[1] = mill[2] = -1
            return
        mill[4] = ans
        mill[3] = 0
        runup = False
    elif op == 1:
        ans = mill[1] - mill[2]
        if ans >= constant.MAX_NUMBER or ans < 0:
            runup = True
            mill[3] = mill[4] = 0
            mill[0] = mill[1] = mill[2] = -1
            return
        mill[4] = ans
        mill[3] = 0
        runup = False
    elif op == 2:
        ans = mill[1] * mill[2]
        mill[3] = ans // constant.MAX_NUMBER
        mill[4] = ans % constant.MAX_NUMBER
        runup = False
    else:
        if mill[2] == 0:
            runup = True
            mill[3] = mill[4] = 0
            mill[0] = mill[1] = mill[2] = -1
            return
        x = mill[0] * constant.MAX_NUMBER + mill[1]
        quotient = x // mill[2]
        remainder = x % mill[2]
        if quotient >= constant.MAX_NUMBER:
            runup = True
            mill[3] = mill[4] = 0
            mill[0] = mill[1] = mill[2] = -1
            return
        mill[3] = quotient
        mill[4] = remainder
        runup = False

    mill[0] = mill[1] = mill[2] = -1


def print_val(val):
    with open(sys.argv[2], "a") as f_output:
        f_output.write(str(val) + '\n')
    print(val)


# main
with open(sys.argv[1], "r") as f_source:
    lines = f_source.readlines()
    i = 0
    while i < len(lines):
        if lines[i].strip() == "":
            del lines[i]
            i -= 1
        i += 1

with open(sys.argv[2], "w") as f_output:
    pass
# ---- initialize ----

# the decimal of each column is 8
# thus the range of numbers is [0, 100000000)
# 15 store columns in total, numbered from 0 to 14
store = []
for i in range(0, 15):
    store.append(-1)

# mill[0]: I1'  mill[1]: I1  mill[2]: I2
# mill[3]: E'   mill[4]: E
mill = []
for i in range(0, 3):
    mill.append(-1)
mill.append(0)
mill.append(0)

op = -1
runup = False

# ---- finish initialize ----

cur = 0
while cur < len(lines):
    line = lines[cur].strip().split(' ')
    cur += 1

    if line[0] == 'N':
        res = valid.n_validator(line)
        if type(res) is str:
            print("Line " + str(cur - 1) + ": " + res)
            break
        store[res[0]] = res[1]
        runup = False

    elif line[0] == '+' or line[0] == '-' \
            or line[0] == '*' or line[0] == '/':
        res = valid.four_validator(line)
        if type(res) is str:
            print("Line " + str(cur - 1) + ": " + res)
            break
        op = res
        mill[0] = mill[1] = mill[2] = -1
        mill[3] = mill[4] = 0
        runup = False

    elif line[0] == 'L' or line[0] == 'S' \
            or line[0] == "L'" or line[0] == "S'":
        res = valid.lsp_validator(line)
        if type(res) is str:
            print("Line " + str(cur - 1) + ": " + res)
            break

        if line[0] == 'L':
            if store[res] == -1:
                print("Line " + str(cur - 1) + ": " + constant.STORE_NOT_INITIALIZE)
                break
            v = store[res]
            if op == -1:
                print("Line " + str(cur - 1) + ": " + constant.NO_OP)
                break
            if mill[1] == -1:
                mill[1] = v
                runup = False
            else:
                mill[2] = v
                execute()
        elif line[0] == "L'":
            if store[res] == -1:
                print("Line " + str(cur - 1) + ": " + constant.STORE_NOT_INITIALIZE)
                break
            v = store[res]
            if op != 3:
                print("Line " + str(cur - 1) + ": " + constant.OP_IS_NOT_DIVIDE)
                break
            mill[0] = v
            runup = False
        elif line[0] == 'S':
            store[res] = mill[4]
            runup = False
        else:
            store[res] = mill[3]
            runup = False

    elif line[0] == 'P':
        res = valid.lsp_validator(line)
        if type(res) is str:
            print("Line " + str(cur - 1) + ": " + res)
            break
        if store[res] == -1:
            print("Line " + str(cur - 1) + ": " + constant.STORE_NOT_INITIALIZE)
            break
        print_val(store[res])
        runup = False

    elif line[0] == 'B' or line[0] == 'F':
        res = valid.fb_validator(line, cur)
        if type(res) is str:
            print("Line " + str(cur - 1) + ": " + res)
            break
        cur = res
        runup = False

    elif line[0] == '?B' or line[0] == '?F':
        res = valid.fb_validator(line, cur)
        if type(res) is str:
            print("Line " + str(cur - 1) + ": " + res)
            break
        if runup:
            cur = res
        runup = False

    else:
        print("Line " + str(cur - 1) + ": " + constant.INVALID_OPERATION)
