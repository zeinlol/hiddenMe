import uuid


class UlidConverter:
    """
    Can use "uuid".
    But later format can be changed from "uuid-compatible" (017d0493-9160-2f05-8ddc-de91015eecd9) (len 36)
        to "ULID-native" (01BX5ZZKBKACTAV9WEVGEMMVRZ) (len 26)
        or "CUB64UUID" (FCpk9gh_RT-O8E8PIEMe4A) (len 22)
    """

    regex = "[0-9a-f-]{36}"

    # noinspection PyMethodMayBeStatic
    def to_python(self, value):
        return uuid.UUID(value)

    # noinspection PyMethodMayBeStatic
    def to_url(self, value):
        return str(value)
