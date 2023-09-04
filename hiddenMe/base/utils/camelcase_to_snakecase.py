import re

# "getHTTPResponseCode"->"get_http_response_code"
pattern__camelcase_to_snakecase__advanced_irreversible = re.compile("((?!^)(?<!_)[A-Z][a-z]+|(?<=[a-z0-9])[A-Z])")


def camelcase_to_snakecase(text: str) -> str:
    """
    Converts "CamelCase" & "lowerCamelCase" to "snake_case".
    Useful convert JSON to "python class"

    Convert "getHTTPResponseCode"->"get_http_response_code". So, it irreversible for acronyms (HTTP)

    For test:

        def debug_convert(text: str) -> None:
            print("-" * 10)
            print(text)
            print(camelcase_to_snakecase(text))
            print("-" * 10)


        debug_convert('camel2_camel2_case')  # camel2_camel2_case
        debug_convert('getHTTPResponseCode')  # get_http_response_code
        debug_convert('HTTPResponseCodeXYZ')  # http_response_code_xyz
    """
    return re.sub(pattern__camelcase_to_snakecase__advanced_irreversible, r"_\1", text).lower()
