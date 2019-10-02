import constant as const


def n_validator(line):
    if len(line) != 3:
        return const.INVALID_OPERATION
    try:
        k = int(line[1])
        n = int(line[2])
    except ValueError:
        return const.NOT_INTEGER

    if k < 0 or k >= const.MAX_STORE:
        return const.INDEX_OUT_OF_RANGE
    if n < 0 or n >= const.MAX_NUMBER:
        return const.NUMBER_OUT_OF_RANGE
    return k, n


def four_validator(line):
    if len(line) != 1:
        return const.INVALID_OPERATION
    op = line[0]
    # 0: +, 1: -, 2: *, 3: /
    if op == '+':
        return 0
    elif op == '-':
        return 1
    elif op == '*':
        return 2
    else:
        return 3


def lsp_validator(line):
    if len(line) != 2:
        return const.INVALID_OPERATION
    try:
        k = int(line[1])
    except ValueError:
        return const.NOT_INTEGER
    if k < 0 or k >= const.MAX_STORE:
        return const.INDEX_OUT_OF_RANGE
    return k


def fb_validator(line, cur):
    if len(line) != 2:
        return const.INVALID_OPERATION
    try:
        n = int(line[1])
    except ValueError:
        return const.NOT_INTEGER
    if line[0] == '?F':
        cur += n
    else:
        cur -= n
        if cur < 0:
            cur = 0
    return cur
