import { PositionService } from '@/lib/api';
import { NextResponse } from 'next/server';

const getPositions = async () => {
  const positionResponse = await PositionService.getPositions();

  return NextResponse.json({
    message: 'success',
    statusCode: 200,
    data: positionResponse.data,
  });
};

export { getPositions as GET };
