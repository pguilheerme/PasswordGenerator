from rest_framework.routers import DefaultRouter
from .views import PostViewSet

post_router = DefaultRouter()
post_router.register(r'pasS', PostViewSet)