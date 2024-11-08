'use client';

import Datepicker from '@/components/datepicker';
import SelectCommon from '@/components/select-common';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UpdateDialog from '@/components/update-dialog';
import { SelectPair } from '@/types';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  mutateHouseholdHistories,
  useGetBalance,
  useGetCategories,
  useGetHouseholdHistories,
} from '@/repository/hooks';
import { deleteHouseholdHistories } from '@/repository/householdHistories';

export default function Dashboard() {
  const [categorySelectPair, setCategorySelectPair] = useState<SelectPair[]>(
    []
  );
  const [balanceSelected, setBalanceSelected] = useState(false);

  const balanceSWRRes = useGetBalance();
  const categoriesSWRRes = useGetCategories();
  const householdHistoriesSWRRes = useGetHouseholdHistories('202302'); // paramは暫定

  if (
    balanceSWRRes.isLoading ||
    categoriesSWRRes.isLoading ||
    householdHistoriesSWRRes.isLoading
  ) {
    return <></>;
  }
  if (balanceSWRRes.error || categoriesSWRRes.error) {
    return <>Something Went Wrong</>;
  }

  function changeBlanace(value: string) {
    setBalanceSelected(true);
    setCategorySelectPair([]);
    if (!categoriesSWRRes.data) return;

    categoriesSWRRes.data.forEach((item) => {
      if (item.balanceId.toString() === value) {
        setCategorySelectPair((prev) => [
          ...prev,
          { label: item.name, value: item.value },
        ]);
      }
    });
  }

  async function deleteHouseholdHistory(id: number) {
    const res = await deleteHouseholdHistories(id); // param固定
    if (res.error) {
      return;
    }
    const updateData = householdHistoriesSWRRes.data?.filter(
      (item) => item.id !== id
    );
    mutateHouseholdHistories(updateData!, '202302'); // param固定
  }

  const dialogBody = (
    <div className='grid gap-4 py-4'>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label
          htmlFor='date'
          className='text-right'
        >
          日付
        </Label>
        <Datepicker id='date' />
      </div>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label
          htmlFor='balance'
          className='text-right'
        >
          収支
        </Label>
        <SelectCommon
          id='balance'
          label='収支'
          items={balanceSWRRes.data ? balanceSWRRes.data : []}
          valueChange={changeBlanace}
        />
      </div>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label
          htmlFor='category'
          className='text-right'
        >
          カテゴリ
        </Label>
        <SelectCommon
          id='category'
          label='カテゴリ'
          items={categorySelectPair}
          disabled={!balanceSelected}
        />
      </div>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label
          htmlFor='content'
          className='text-right'
        >
          内容
        </Label>
        <Input
          id='content'
          className='col-span-3'
        />
      </div>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label
          htmlFor='amount'
          className='text-right'
        >
          金額
        </Label>
        <Input
          id='amount'
          defaultValue='0'
          className='col-span-3'
        />
      </div>
    </div>
  );

  return (
    <div className='container'>
      <div>
        <UpdateDialog
          title='内訳追加'
          body={dialogBody}
        />
      </div>
      <div className='mt-2 grid grid-cols-3 gap-4'>
        <div className='border border-blue-300 rounded-lg bg-blue-100 h-16 flex flex-col gap-1'>
          <p className='pt-1 pl-4'>↑ 収入</p>
          <p className='pr-4 text-right'>￥ 0</p>
        </div>
        <div className='border border-red-300 rounded-lg bg-red-100 h-16 flex flex-col gap-1'>
          <p className='pt-1 pl-4'>↓ 支出</p>
          <p className='pr-4 text-right'>￥ 0</p>
        </div>
        <div className='border border-green-300 rounded-lg bg-green-100 h-16 flex flex-col gap-1'>
          <div className='pt-1 pl-4 flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-landmark'
            >
              <line
                x1='3'
                x2='21'
                y1='22'
                y2='22'
              />
              <line
                x1='6'
                x2='6'
                y1='18'
                y2='11'
              />
              <line
                x1='10'
                x2='10'
                y1='18'
                y2='11'
              />
              <line
                x1='14'
                x2='14'
                y1='18'
                y2='11'
              />
              <line
                x1='18'
                x2='18'
                y1='18'
                y2='11'
              />
              <polygon points='12 2 20 7 4 7' />
            </svg>
            <p className='pl-1'>残高</p>
          </div>
          <p className='pr-4 text-right'>￥ 0</p>
        </div>
      </div>
      <div className='py-4 w-full'>
        <Table className='border'>
          <TableHeader className='bg-slate-200'>
            <TableRow>
              <TableHead className='w-[100px]'>Date</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Content</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {householdHistoriesSWRRes.data ? (
              householdHistoriesSWRRes.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className='font-medium'>{item.date}</TableCell>
                  {item.balance === 'income' ? (
                    <TableCell>{item.content}</TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                  {item.balance === 'income' ? (
                    <TableCell>{item.amount}</TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                  <TableCell>{item.balance}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  {item.balance === 'income' ? (
                    <TableCell></TableCell>
                  ) : (
                    <TableCell>{item.amount}</TableCell>
                  )}
                  {item.balance === 'income' ? (
                    <TableCell></TableCell>
                  ) : (
                    <TableCell>{item.content}</TableCell>
                  )}
                  <TableCell onClick={() => deleteHouseholdHistory(item.id)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-trash-2'
                    >
                      <path d='M3 6h18' />
                      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                      <line
                        x1='10'
                        x2='10'
                        y1='11'
                        y2='17'
                      />
                      <line
                        x1='14'
                        x2='14'
                        y1='11'
                        y2='17'
                      />
                    </svg>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
