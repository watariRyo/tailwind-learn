import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface UpdateDialogProps {
  title: string;
  body: JSX.Element;
  description?: string;
}

export default function UpdateDialog(props: UpdateDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='border border-blue-300 rounded-lg bg-blue-100 text-center font-bold'
        >
          {props.title}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          {props.description && (
            <DialogDescription>{props.description}</DialogDescription>
          )}
        </DialogHeader>
        {props.body}
        <DialogFooter>
          <Button type='submit'>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
