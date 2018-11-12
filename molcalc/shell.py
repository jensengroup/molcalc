
import subprocess as sp

def shell(cmd, shell=False):

    if shell:
        p = sp.Popen(cmd, shell=True, stdin=sp.PIPE, stdout=sp.PIPE, stderr=sp.PIPE)
    else:
        cmd = cmd.split()
        p = sp.Popen(cmd, stdin=sp.PIPE, stdout=sp.PIPE, stderr=sp.PIPE)

    output, err = p.communicate()
    return output, err

