"use client";

import { useState, useEffect } from "react";
import { Share2, Facebook, Twitter, Link as LinkIcon, Check, Mail } from "lucide-react";

interface ProductShareProps {
  productName: string;
  slug: string;
}

export function ProductShare({ productName, slug }: ProductShareProps) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
    if (typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const shareText = `Check out ${productName} by Fehmi Farzana Designs`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: shareText,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  const encodedUrl = encodeURIComponent(url || `https://www.fehmifarz.com/product/${slug}`);
  const encodedText = encodeURIComponent(shareText);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 mt-6 border-t border-gray-100">
      <span className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Share</span>
      <div className="flex gap-3">
        {canNativeShare && (
          <button 
            onClick={handleNativeShare}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
        
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors"
          title="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </a>
        
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors"
          title="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>
        
        <a 
          href={`mailto:?subject=${encodedText}&body=${encodedUrl}`}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors"
          title="Share via Email"
        >
          <Mail className="w-4 h-4" />
        </a>

        <button 
          onClick={handleCopy}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors"
          title="Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
