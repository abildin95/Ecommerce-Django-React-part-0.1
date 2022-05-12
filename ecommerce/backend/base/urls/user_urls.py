from django.urls import path
from base.views.user_views import *


urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', getUserProfile, name='users-profile'),
    path('profile/update/', updateUserProfile, name='user-profile-update'),
    path('register/', registerUser, name='register'),
    path('', getUsers, name='users'),
]