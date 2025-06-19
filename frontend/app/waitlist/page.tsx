import React from 'react'
import WaitlistComponent from './_components/WaitlistClient'
export const metadata = {
  title: 'N3 Security Suite Waitlist | AN3',
  description:
    'N3 is the first modular security suite developed under AN3, built to deliver continuous protection across the entire Web3 stack, from pre-deployment audits to live threat detection and community-powered redteaming.',
  icons: {
    icon: '/N3 icon.png',
    shortcut: '/N3 icon.png',
    apple: '/N3 icon.png',
  },
};

function Waitlist() {
  return (
    <div>
      <WaitlistComponent />
    </div>
  )
}

export default Waitlist