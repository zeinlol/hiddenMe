from collections.abc import Iterable
from typing import Final

from django.contrib.contenttypes.models import ContentType

from hiddenMe.base.utils.camelcase_to_snakecase import camelcase_to_snakecase
from hiddenMe.base.utils.randomator import make_big_urlsafe_random_value

PATH_DELIMITER: Final[str] = "/"


def split_path_part(path: str) -> Iterable[str]:
    """
    Split path by PATH_DELIMITER and "dotes" and remove empty parts.
    """

    path_as_list = path.split(sep=PATH_DELIMITER)
    path_as_nested_lists = [part.split(sep=".") for part in path_as_list]
    # Flatten list.
    list_of_parts = []
    for parts in path_as_nested_lists:
        list_of_parts.extend(parts)

    return filter(None, list_of_parts)


def get_path_to_file_with_extension(
    instance,
    filename: str,
    #
    prefix_part: str = "files",
    entity_type_part: str | None = None,
    is_use_instance_pk: bool = True,
    file_name: str | None = "file",
    is_use_extension: bool = True,
    #
    max_length_of_path: int = 255,  # Because this value often used for this field.
    min_length_of_random_part: int = 60,
) -> str:
    _, extension = filename.rsplit(sep=".", maxsplit=1)

    path_as_list__before_random = []
    # [handle_prefix_path]-[BEGIN]
    if prefix_part:
        path_as_list__before_random.extend(split_path_part(prefix_part))
    else:
        raise ValueError("prefix_part is required")
    # [handle_prefix_path]-[END]

    # [handle_entity_type_name]-[BEGIN]
    if entity_type_part:
        path_as_list__before_random.extend(split_path_part(entity_type_part))
    else:
        content_type = ContentType.objects.get_for_model(instance)
        for part in [content_type.app_label, content_type.model]:
            path_as_list__before_random.extend(map(camelcase_to_snakecase, split_path_part(part)))
    # [handle_entity_type_name]-[END]

    # [handle_instance_pk]-[BEGIN]
    if is_use_instance_pk:
        path_as_list__before_random.append(str(instance.pk))
    else:
        path_as_list__before_random.append(make_big_urlsafe_random_value())
    # [handle_filename]-[BEGIN]
    filename_local = ""
    if file_name:
        filename_local = file_name

    elif is_use_extension:
        filename_local = f"{filename_local}.{extension}"

    if not filename_local:
        filename_local = make_big_urlsafe_random_value()

    path_as_list__after_random = [filename_local]
    # [handle_filename]-[END]

    path_as_str__before_random = PATH_DELIMITER.join(path_as_list__before_random)
    path_as_str__after_random = PATH_DELIMITER.join(path_as_list__after_random)

    current_length = len(path_as_str__before_random) + len(path_as_str__after_random)
    random_part_length = max_length_of_path - current_length
    if random_part_length < min_length_of_random_part:
        raise ValueError(f"random_part_length is too small: {random_part_length}. Need to adapt logic.")

    # [add_random_part]-[BEGIN]
    random_part = make_big_urlsafe_random_value(size=random_part_length)
    # [add_random_part]-[END]

    return PATH_DELIMITER.join([path_as_str__before_random, random_part, path_as_str__after_random])
