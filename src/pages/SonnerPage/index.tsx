import { Toaster, toast } from 'sonner';
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const toastPositionValues = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const;

type ToastPosition = (typeof toastPositionValues)[number];

const SonnerPage = () => {
  const [position, setPosition] = useState<ToastPosition>('bottom-right');
  const [expand, setExpand] = useState(false);

  const handleDefaultToast = () => {
    toast('Default notification', {
      description: 'This is a default Sonner toast.',
      toasterId: 'sonner-page',
    });
  };

  const handleSuccessToast = () => {
    toast.success('Success', {
      description: 'Your action was successful.',
      toasterId: 'sonner-page',
    });
  };

  const handleErrorToast = () => {
    toast.error('Error', {
      description: 'Something went wrong.',
      toasterId: 'sonner-page',
    });
  };

  const handleInfoToast = () => {
    toast.info('Info', {
      description: 'This is some informational toast.',
      toasterId: 'sonner-page',
    });
  };

  const handleWarningToast = () => {
    toast.warning('Warning', {
      description: 'Please pay attention to this warning.',
      toasterId: 'sonner-page',
    });
  };

  const handleMessageToast = () => {
    toast.message('Message', {
      description: 'This is a message toast.',
      toasterId: 'sonner-page',
    });
  };

  const handleLoadingToast = () => {
    toast.loading('Loading...', {
      description: 'Simulating a loading state.',
      toasterId: 'sonner-page',
    });
  };

  const handlePromiseToast = () => {
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('Data loaded'), 1500);
    });

    toast.promise(promise, {
      loading: 'Loading data...',
      success: 'Data loaded successfully',
      error: 'Failed to load data',
      toasterId: 'sonner-page',
    });
  };

  const handleCustomToast = () => {
    toast.custom(
      (id) => (
        <div className="flex items-center gap-3">
          <div className="text-sm">
            <div className="font-semibold">Custom toast</div>
            <div>Fully custom JSX content.</div>
          </div>
          <Button variant="outline" size="sm" onClick={() => toast.dismiss(id)}>
            Dismiss
          </Button>
        </div>
      ),
      {
        toasterId: 'sonner-page',
      }
    );
  };

  const handleDismissAll = () => {
    toast.dismiss();
  };

  return (
    <PageLayout>
      <PageTitle>Sonner Toasts</PageTitle>
      <p className="mb-4 text-sm">
        <a
          href="https://sonner.emilkowal.ski/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Sonner documentation
        </a>
      </p>
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm font-medium">Toast position</span>
        <Select value={position} onValueChange={(value) => setPosition(value as ToastPosition)}>
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {toastPositionValues.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <Checkbox
          id="expand-toasts"
          checked={expand}
          onCheckedChange={(checked) => setExpand(!!checked)}
        />
        <label htmlFor="expand-toasts" className="text-sm">
          Expand toasts (Toaster expand={'' + expand})
        </label>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={handleDefaultToast}>
          Default toast
        </Button>
        <Button variant="default" onClick={handleSuccessToast}>
          Success toast
        </Button>
        <Button variant="secondary" onClick={handleInfoToast}>
          Info toast
        </Button>
        <Button variant="outline" onClick={handleWarningToast}>
          Warning toast
        </Button>
        <Button variant="destructive" onClick={handleErrorToast}>
          Error toast
        </Button>
        <Button variant="outline" onClick={handleMessageToast}>
          Message toast
        </Button>
        <Button variant="outline" onClick={handleLoadingToast}>
          Loading toast
        </Button>
        <Button variant="outline" onClick={handlePromiseToast}>
          Promise toast
        </Button>
        <Button variant="outline" onClick={handleCustomToast}>
          Custom toast
        </Button>
        <Button variant="outline" onClick={handleDismissAll}>
          Dismiss all
        </Button>
      </div>

      <Toaster id="sonner-page" position={position} richColors expand={expand} />
    </PageLayout>
  );
};

export default SonnerPage;
