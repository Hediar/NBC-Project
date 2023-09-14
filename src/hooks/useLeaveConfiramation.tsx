import { useCallback, useState } from 'react';

import { Modal } from 'antd';
import LeaveConfirmModal from '@/components/common/LeaveConfirmModal';
import useRouteChangeEvents from '@/static/RouteChangeEventsProvider';

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
    confirmationModal: (
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
