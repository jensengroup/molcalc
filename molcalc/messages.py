import constants


def ajax_error(error, message):
    """Get json error message"""
    return {constants.NAME_ERROR: error, constants.NAME_MSG: message}
