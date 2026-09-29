from rest_framework import viewsets
from .models import District, Block, Panchayat
from .serializers import DistrictSerializer, BlockSerializer, PanchayatSerializer

class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer

class BlockViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = BlockSerializer
    def get_queryset(self):
        queryset = Block.objects.all()
        district_id = self.request.query_params.get('district')
        if district_id:
            queryset = queryset.filter(district_id=district_id)
        return queryset

class PanchayatViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PanchayatSerializer
    def get_queryset(self):
        queryset = Panchayat.objects.all()
        block_id = self.request.query_params.get('block')
        if block_id:
            queryset = queryset.filter(block_id=block_id)
        return queryset
