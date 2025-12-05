// app/dynamicApps/[app]/page.tsx





'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // make sure this path is correct
import StartCompo from '@/components/dynamicAppsComponents/StartCompo';

export default function DynamicAppPage() {
  // Get assetId from Redux state
  const assetId = useSelector((state: RootState) => state.global.assetId);
  console.log(assetId, '================= DynamicAppPage assetId ===================');

  return <div>{assetId ? <StartCompo assetId={assetId} /> : <p>No asset selected.</p>}</div>;
}
// ====================
