
def print_gt_zero_elem(matrix):
    print(get_elems(matrix))
    
def get_elems(matrix, thres=0.1):
    return matrix[matrix >= thres]