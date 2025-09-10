import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import '../style/components/SocialShare.scss';

const SocialShare = ({ job }) => {
  const shareUrl = window.location.href;
  const shareText = `Check out this job opening: ${job.title} at ${job.department?.title}`;

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="social-share">
      <div className="social-buttons">
        <button 
          className="social-btn facebook"
          onClick={shareOnFacebook}
          title="Share on Facebook"
        >
          <FaFacebook size={20} />
        </button>

        <button 
          className="social-btn linkedin"
          onClick={shareOnLinkedIn}
          title="Share on LinkedIn"
        >
          <FaLinkedin size={20} />
        </button>

        <button 
          className="social-btn twitter"
          onClick={shareOnTwitter}
          title="Share on Twitter"
        >
          <FaTwitter size={20} />
        </button>
      </div>
    </div>
  );
};

export default SocialShare;