import React from 'react';
import ErrorHandler from '../errors/ErrorHandler';
import { Skeleton } from '@mui/material';
import type { QueryStatus } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
  status?: QueryStatus;
  refetch?: () => void;
  skeletonHeight?: number;
};

const StatusHandler = ({ status, refetch, children, skeletonHeight = 300 }: Props) => {
  return (
    <>
      {status === 'pending' ? (
        <Skeleton height={skeletonHeight} />
      ) : status === 'error' ? (
        <ErrorHandler onRefetch={refetch!} />
      ) : (
        children
      )}
    </>
  );
};

export default StatusHandler;
