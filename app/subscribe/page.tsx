'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'; 
import { Button } from '@/components/components/ui/button';
import { Skeleton } from '@/components/components/ui/skeleton';
const url = process.env.NEXT_PUBLIC_SITE_URL;
const function_url = process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL;
const ProductDisplay = () => {
  const handleCheckout = async (lookup_key) => {
    const res = await fetch(function_url + 'stripe-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lookup_key: lookup_key })
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-8 border p-4 rounded-lg shadow-lg">  
        <h1 className="text-2xl font-bold mb-4">Starter Plan</h1>
        <p className="text-lg mb-4">Subscribe to brokerage Plan for just $30/month!</p>
        <Button onClick={() => handleCheckout('Brokerage_-96907c0')}>Checkout</Button>
      </div>
    </div>)};
  


const SuccessDisplay = ({ sessionId }) => {
  const handlePortal = async (sessionId) => {
    const res = await fetch(function_url + '/stripe-portal', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ session_id: sessionId })
  });
  const { url } = await res.json();
  window.location.href = url;
};
  return (
    <section>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8 border p-4 rounded-lg shadow-lg">  
          <h3>Subscription to starter plan successful!</h3>
        
      <Button onClick={() => handlePortal(sessionId)} className="mt-4">
          Manage your billing information
        </Button>
        </div>
      </div>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id') || '');
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
    setLoading(false);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Skeleton className="w-[350px] h-[200px] mb-8" />
      </div>
    );
  }

  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}