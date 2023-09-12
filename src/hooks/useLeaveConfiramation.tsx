import { useCallback, useState } from 'react';
import useRouteChangeEvents from '@/app/RouteChangeEventsProvider';
import { Modal } from 'antd';
import LeaveConfirmModal from '@/components/common/LeaveConfirmModal';

const useLeaveConfirmation = (shouldPreventRouteChange: boolean) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const onBeforeRouteChange = useCallback(() => {
    if (shouldPreventRouteChange) {
      setShowConfirmModal(true);
      return false;
    }

    return true;
  }, [shouldPreventRouteChange]);

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange });

  return {
    confirmationDialog: (
      <Modal centered open={showConfirmModal} footer={null} onCancel={() => setShowConfirmModal(false)}>
        <LeaveConfirmModal
          open={showConfirmModal}
          onContinue={() => setShowConfirmModal(false)}
          onLeave={() => allowRouteChange()}
        />
      </Modal>
    )
  };
};

export default useLeaveConfirmation;
