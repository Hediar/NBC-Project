import { useCallback, useState } from 'react';
import useRouteChangeEvents from './useRouteChangeEvents';
import { Modal } from 'antd';
import LeaveConfirmModal from '@/components/common/LeaveConfirmModal';

const useLeaveConfirmation = (shouldPreventRouteChange: boolean) => {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const onBeforeRouteChange = useCallback(() => {
    if (shouldPreventRouteChange) {
      setShowConfirmationDialog(true);
      return false;
    }

    return true;
  }, [shouldPreventRouteChange]);

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange });

  return {
    confirmationDialog: (
      <LeaveConfirmModal
        open={showConfirmationDialog}
        onClick={() => {
          allowRouteChange();
        }}
        onClose={() => setShowConfirmationDialog(false)}
      />
    )
  };
};

export default useLeaveConfirmation;
