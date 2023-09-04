import secrets


def make_big_urlsafe_random_value(size: int = 66) -> str:
    """
    Generate a random string of size `size`.
    """
    # It is always longer. So we need to cut it.
    return secrets.token_urlsafe(nbytes=66)[:size]