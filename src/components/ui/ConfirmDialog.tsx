import Button from './Button';
import CustomDialog from './CustomDialog';

interface Props {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  okText?: string;
  isLoading?: boolean;
}

const ConfirmDialog = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  cancelText,
  okText,
  isLoading,
}: Props) => {
  /**
   * Formal dialog layout used for yes | no confirmations
   */

  return (
    <CustomDialog open={open} onClose={onCancel}>
      <div className='p-4 text-center'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='py-2 text-sm'>{description}</p>
        <div className='mt-3 flex items-center gap-2'>
          <Button color='secondary' fullWidth onClick={onCancel}>
            {cancelText ? cancelText : 'Cancel'}
          </Button>
          <Button loading={isLoading} fullWidth onClick={onConfirm}>
            {okText ? okText : 'Ok'}
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
};

export default ConfirmDialog;
