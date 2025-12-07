import { toast } from 'sonner';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';

const SonnerPage = () => {
  const handleDefaultToast = () => {
    toast('Default notification', {
      description: 'This is a default Sonner toast.',
    });
  };

  const handleSuccessToast = () => {
    toast.success('Success', {
      description: 'Your action was successful.',
    });
  };

  const handleErrorToast = () => {
    toast.error('Error', {
      description: 'Something went wrong.',
    });
  };

  return (
    <PageLayout>
      <PageTitle>Sonner Toasts</PageTitle>
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={handleDefaultToast}>
          Default toast
        </Button>
        <Button variant="default" onClick={handleSuccessToast}>
          Success toast
        </Button>
        <Button variant="destructive" onClick={handleErrorToast}>
          Error toast
        </Button>
      </div>
    </PageLayout>
  );
};

export default SonnerPage;
