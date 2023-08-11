from faker import Faker


def generate_fake_name() -> str:
    faker = Faker()
    adjective = faker.color_name()
    noun = faker.first_name()
    number = faker.random_int(min=0, max=100)
    return f"{adjective} {noun} {number}"
