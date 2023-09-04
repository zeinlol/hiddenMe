from hiddenMe.base.models.icon_raster_model_mixin import IconRasterModelMixin
from hiddenMe.base.models.title_description_model_mixin import TitleDescriptionModelMixin


class TitleDescriptionIconModelMixin(TitleDescriptionModelMixin, IconRasterModelMixin):
    """
    An abstract base class model that provides:
    - title
    - description
    - icon
    """

    class Meta:
        abstract = True
