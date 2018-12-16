
import subprocess as sp

def shell(cmd, shell=False):
    """
    """

    if shell:
        proc = sp.Popen(cmd, shell=True, stdin=sp.PIPE, stdout=sp.PIPE, stderr=sp.PIPE)
    else:
        cmd = cmd.split()
        proc = sp.Popen(cmd, stdin=sp.PIPE, stdout=sp.PIPE, stderr=sp.PIPE)

    output, err = proc.communicate()
    return output, err
