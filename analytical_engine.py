import os
import sys
import json
import constant
import validator as valid


def execute():
    global runup
    global modify_stack
    if op == 0:
        ans = mill[1] + mill[2]
        if ans >= constant.MAX_NUMBER or ans < 0:
            runup = True
            for i in range(0, 5):
                if mill[i] != 0:
                    mill[i] = 0
                    modify_stack.append((i, 0))
            return
        mill[4] = ans
        mill[3] = 0
        modify_stack.append((3, mill[3]))
        modify_stack.append((4, mill[4]))
        runup = False
    elif op == 1:
        ans = mill[1] - mill[2]
        if ans >= constant.MAX_NUMBER or ans < 0:
            runup = True
            for i in range(0, 5):
                if mill[i] != 0:
                    mill[i] = 0
                    modify_stack.append((i, 0))
            return
        mill[4] = ans
        mill[3] = 0
        modify_stack.append((3, mill[3]))
        modify_stack.append((4, mill[4]))
        runup = False
    elif op == 2:
        ans = mill[1] * mill[2]
        mill[3] = ans // constant.MAX_NUMBER
        mill[4] = ans % constant.MAX_NUMBER
        modify_stack.append((3, mill[3]))
        modify_stack.append((4, mill[4]))
        runup = False
    else:
        if mill[2] == 0:
            runup = True
            for i in range(0, 5):
                if mill[i] != 0:
                    mill[i] = 0
                    modify_stack.append((i, 0))
            return
        x = mill[0] * constant.MAX_NUMBER + mill[1]
        quotient = x // mill[2]
        remainder = x % mill[2]
        if quotient >= constant.MAX_NUMBER:
            runup = True
            for i in range(0, 5):
                if mill[i] != 0:
                    mill[i] = 0
                    modify_stack.append((i, 0))
            return
        mill[3] = quotient
        mill[4] = remainder
        modify_stack.append((3, mill[3]))
        modify_stack.append((4, mill[4]))
        runup = False

    for i in range(0, 3):
        if mill[i] != 0:
            mill[i] = 0
            modify_stack.append((i, 0))


def num_to_op(num):
    numbers = {
        -1: '~',
        0: '+',
        1: '-',
        2: '*',
        3: '/'
    }
    return numbers.get(num, None)


def bool_to_runup(val):
    booleans = {
        False: '0',
        True: '1'
    }
    return booleans.get(val, None)


def print_code():
    global lines
    for i in range(0, len(lines)):
        print("#" + str(i + 1) + ": " + lines[i].strip() + "@")
        # print(lines[i].strip())


def print_state(cur_line, step):
    global print_num
    global modify_stack
    print("Step %d" % step)
    print(str(num_to_op(op)) + ' ' + str(bool_to_runup(runup)))
    print(str(cur_line) + ' ' + str(len(modify_stack)))
    for pair in modify_stack:
        # idx: 0~4 for mill, 5~14 for store
        idx = pair[0]
        if idx < 5:
            num = mill[idx]
        else:
            num = store[idx - 5]
        # print(idx, end=" ")
        # out = []
        # for j in range(0, constant.MAX_DIGIT):
        #     out.append(num % 10)
        #     num = num // 10
        # for j in range(constant.MAX_DIGIT - 1, -1, -1):
        #     print(out[j], end=" ")
        print(str(idx) + " " + str(num))

    print("%d" % print_num)

    print_num = -1
    modify_stack = []


def print_val(val):
    # with open(sys.argv[2], "a") as f_output:
    #     f_output.write(str(val) + '\n')
    # print(val)
    global print_num
    print_num = val


# main
with open(sys.argv[1], "r") as f_source:
    lines = f_source.readlines()
    i = 0
    while i < len(lines):
        raw_line = lines[i]
        for j in range(0, len(raw_line)):
            if raw_line[j] == '#':
                raw_line = raw_line[:j]
                break
        lines[i] = raw_line
        if lines[i].strip() == "":
            del lines[i]
            i -= 1
        i += 1

# with open(sys.argv[2], "w") as f_output:
#     pass

# ---- initialize ----

# the decimal of each column is 8
# thus the range of numbers is [0, 100000000)
# MAX_STORE store columns in total, numbered from 0 to MAX_STORE-1
store = []
for i in range(0, constant.MAX_STORE):
    store.append(0)

# mill[0]: I1'  mill[1]: I1  mill[2]: I2
# mill[3]: E'   mill[4]: E
mill = []
for i in range(0, 3):
    mill.append(0)
mill.append(0)
mill.append(0)

op = -1
runup = False
loaded = False

print_num = -1
modify_stack = []
# ---- finish initialize ----

print_code()
cur = 0
step_cnt = 0
while cur < len(lines):
    line = lines[cur].strip().split(' ')
    cur += 1
    step_cnt += 1

    if line[0] == 'N':
        res = valid.n_validator(line)
        if type(res) is str:
            print("Line " + str(cur) + ": " + res)
            break
        store[res[0]] = res[1]
        modify_stack.append((res[0] + 5, res[1]))
        runup = False

    elif line[0] == '+' or line[0] == '-' \
            or line[0] == '*' or line[0] == '/':
        res = valid.four_validator(line)
        if type(res) is str:
            print("Line " + str(cur) + ": " + res)
            break
        op = res
        for i in range(0, 5):
            if mill[i] != 0:
                mill[i] = 0
                modify_stack.append((i, 0))
        runup = False

    elif line[0] == 'L' or line[0] == 'S' \
            or line[0] == "L'" or line[0] == "S'":
        res = valid.lsp_validator(line)
        if type(res) is str:
            print("Line " + str(cur) + ": " + res)
            break

        if line[0] == 'L':
            v = store[res]
            if op == -1:
                print("Line " + str(cur) + ": " + constant.NO_OP)
                break
            if not loaded:
                mill[1] = v
                modify_stack.append((1, v))
                loaded = True
                runup = False
            else:
                mill[2] = v
                modify_stack.append((2, v))
                loaded = False
                print_state(cur, step_cnt)
                step_cnt += 1
                execute()
        elif line[0] == "L'":
            v = store[res]
            if op != 3:
                print("Line " + str(cur) + ": " + constant.OP_IS_NOT_DIVIDE)
                break
            mill[0] = v
            modify_stack.append((0, v))
            runup = False
        elif line[0] == 'S':
            store[res] = mill[4]
            modify_stack.append((res + 5, mill[4]))
            runup = False
        else:
            store[res] = mill[3]
            modify_stack.append((res + 5, mill[3]))
            runup = False

    elif line[0] == 'P':
        res = valid.lsp_validator(line)
        if type(res) is str:
            print("Line " + str(cur) + ": " + res)
            break
        print_val(store[res])
        runup = False

    elif line[0] == 'B' or line[0] == 'F':
        res = valid.fb_validator(line, cur)
        if type(res) is str:
            print("Line " + str(cur) + ": " + res)
            break
        cur = res
        runup = False

    elif line[0] == '?B' or line[0] == '?F':
        res = valid.fb_validator(line, cur)
        if type(res) is str:
            print("Line " + str(cur) + ": " + res)
            break
        if runup:
            cur = res
        runup = False

    else:
        print("Line " + str(cur) + ": " + constant.INVALID_OPERATION)
        break

    print_state(cur, step_cnt)
