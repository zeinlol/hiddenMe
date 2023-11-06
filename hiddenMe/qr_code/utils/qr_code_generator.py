import qrcode
from qrcode.image.pil import PilImage


def generate_qr_code_image(value) -> PilImage:
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(value)
    qr.make(fit=True)

    return qr.make_image(fill_color="black", back_color="white")
