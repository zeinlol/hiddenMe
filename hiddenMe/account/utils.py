
def create_token(token_model, user, _serializer):
    return token_model.objects.create(user=user)



