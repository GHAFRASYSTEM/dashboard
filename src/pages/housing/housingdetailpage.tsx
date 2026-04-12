import { useState }        from 'react';
import { Link, useParams } from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard-layout';
import { Button }          from '../../components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useHousing }      from '../../hooks/useHousing';
import { HousingGallery }          from './components/housing-gallery';
import { HousingDescriptionCard }  from './components/housing-description-card';
import { HousingLocationCard }     from './components/housing-location-card';
import { HousingImageDialog }      from './components/housing-image-dialog';
import { HousingFactsCard }        from './components/HousingFactsCard';
import { HousingNotFound }         from './components/housing-not-found';
import { EditHousingModal } from './components/EditHousingModal';

export default function HousingDetailPage() {
  const { id }    = useParams<{ id: string }>();
  const { housing, loading, error, refetch } = useHousing(id!);

  const [imgIndex,   setImgIndex]   = useState(0);
  const [imgDialog,  setImgDialog]  = useState(false);
  const [showEdit,   setShowEdit]   = useState(false);

  if (loading) return (
    <DashboardLayout title="Loading…" breadcrumbs={[{ label: 'Housing', href: '/housing' }, { label: '…' }]}>
      <div className="py-16 text-center text-muted-foreground">Loading…</div>
    </DashboardLayout>
  );

  if (error || !housing) return <HousingNotFound />;

  const prev = () => setImgIndex(i => (i - 1 + housing.images.length) % housing.images.length);
  const next = () => setImgIndex(i => (i + 1) % housing.images.length);

  return (
    <DashboardLayout
      title={housing.title}
      breadcrumbs={[{ label: 'Housing', href: '/housing' }, { label: housing.title }]}
    >
      {/* Top bar: back + admin edit button */}
      <div className="mb-6 flex items-center justify-between">
        <Link to="/housing">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="size-4" /> Back to Listings
          </Button>
        </Link>

       
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowEdit(true)}
          >
            <Pencil className="size-4" />
            Edit listing
          </Button>
        
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <HousingGallery
            housing={housing}
            currentIndex={imgIndex}
            onOpenModal={() => setImgDialog(true)}
            onPrev={prev}
            onNext={next}
            onSelect={setImgIndex}
          />
          <HousingDescriptionCard description={housing.description} />
          <HousingLocationCard location={housing.location} address={housing.address} />
        </div>

        <div className="space-y-6">
          <HousingFactsCard housing={housing} />
          {/* HousingRequestCard intentionally removed */}
        </div>
      </div>

      <HousingImageDialog
        open={imgDialog}
        onOpenChange={setImgDialog}
        housing={housing}
        currentIndex={imgIndex}
        onPrev={prev}
        onNext={next}
      />

      {showEdit && (
        <EditHousingModal
          housing={housing}
          onClose={()    => setShowEdit(false)}
          onUpdated={() => { setShowEdit(false); refetch(); }}
        />
      )}
    </DashboardLayout>
  );
}