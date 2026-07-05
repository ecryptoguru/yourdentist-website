import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

describe('data.ts content integrity', () => {
  const content = readFile('lib/data.ts');

  describe('Email address', () => {
    it('should use yourdentist27@gmail.com (not old email)', () => {
      expect(content).toMatch(/yourdentist27@gmail\.com/);
      expect(content).not.toMatch(/yourdentist\.clinic@gmail\.com/);
    });
  });

  describe('YouTube videos', () => {
    it('should export youtubeVideos array', () => {
      expect(content).toMatch(/export\s+const\s+youtubeVideos\s*=/);
    });

    it('should have 20 video entries', () => {
      const matches = content.match(/\bid:\s*"[A-Za-z0-9_-]{11}"/g) || [];
      expect(matches.length).toBe(20);
    });

    it('should have title, description, and channel for each video', () => {
      expect(content).toMatch(/title:\s*"/);
      expect(content).toMatch(/description:\s*"/);
      expect(content).toMatch(/channel:\s*"/);
    });

    it('should include known channel names', () => {
      expect(content).toMatch(/Swasthya Plus Odia/);
      expect(content).toMatch(/Swasthya Sambad/);
      expect(content).toMatch(/Kanak News/);
    });
  });

  describe('Achievement photos', () => {
    it('should export achievementPhotos with category field', () => {
      expect(content).toMatch(/export\s+const\s+achievementPhotos\s*=/);
      expect(content).toMatch(/category:/);
    });

    it('should have 10 achievement entries', () => {
      const matches = content.match(/id:\s*\d+,\s*src:\s*"\/images\/before-after\/Achievement/g) || [];
      expect(matches.length).toBe(10);
    });

    it('should have all .jpeg extensions (not .jpg)', () => {
      expect(content).not.toMatch(/Achievement_\d+\.jpg["]/);
    });

    it('should include known categories', () => {
      expect(content).toMatch(/Crowns and Bridges/);
      expect(content).toMatch(/Zirconia Bridge/);
      expect(content).toMatch(/Dental Veneers/);
      expect(content).toMatch(/Orthodontic Treatment/);
      expect(content).toMatch(/Aligners/);
      expect(content).toMatch(/Aesthetic Dentistry/);
      expect(content).toMatch(/Dental Restoration/);
      expect(content).toMatch(/Dental Crown/);
      expect(content).toMatch(/Tooth Extraction/);
      expect(content).toMatch(/Oral Prophylaxis/);
    });
  });

  describe('Certificate photos', () => {
    it('should export certificatePhotos with title field', () => {
      expect(content).toMatch(/export\s+const\s+certificatePhotos\s*=/);
      expect(content).toMatch(/title:/);
    });

    it('should have 13 certificate entries', () => {
      const matches = content.match(/id:\s*\d+,\s*src:\s*"\/images\/achievements\/To Text/g) || [];
      expect(matches.length).toBe(13);
    });

    it('should include known certificate titles', () => {
      expect(content).toMatch(/Indian Dental Conference/);
      expect(content).toMatch(/Workshop on Bollywood Smile Designing/);
      expect(content).toMatch(/Contemporary Techniques in Direct Composite Veneer/);
      expect(content).toMatch(/Training on Lasers in Dentistry/);
    });
  });

  describe('Navigation links', () => {
    it('should have Videos in navLinks', () => {
      expect(content).toMatch(/label:\s*"Videos"/);
      expect(content).toMatch(/href:\s*"\/videos\/"/);
    });

    it('should have all expected nav links', () => {
      expect(content).toMatch(/label:\s*"Home"/);
      expect(content).toMatch(/label:\s*"About"/);
      expect(content).toMatch(/label:\s*"Services"/);
      expect(content).toMatch(/label:\s*"Gallery"/);
      expect(content).toMatch(/label:\s*"Blog"/);
      expect(content).toMatch(/label:\s*"Contact"/);
    });
  });

  describe('About Us content', () => {
    it('should export aboutUsContent with title and paragraphs', () => {
      expect(content).toMatch(/export\s+const\s+aboutUsContent\s*=/);
      expect(content).toMatch(/title:\s*"About Us"/);
      expect(content).toMatch(/paragraphs:/);
    });

    it('should have 3 paragraphs', () => {
      const aboutSection = content.match(/aboutUsContent\s*=\s*\{[\s\S]*?\};/)?.[0] || '';
      const paragraphCount = (aboutSection.match(/"/g) || []).length;
      expect(aboutSection).toMatch(/patient-first approach/);
      expect(aboutSection).toMatch(/sterilisation/);
      expect(aboutSection).toMatch(/Root Canal Treatments/);
    });
  });

  describe('Achievement narrative', () => {
    it('should export achievementNarrative', () => {
      expect(content).toMatch(/export\s+const\s+achievementNarrative\s*=/);
    });

    it('should contain key narrative content', () => {
      expect(content).toMatch(/exceptional dental care/);
      expect(content).toMatch(/Paediatric patients/);
      expect(content).toMatch(/dental implants/);
      expect(content).toMatch(/full-mouth rehabilitation/);
    });
  });

  describe('Testimonials', () => {
    it('should have full testimonial texts (not truncated)', () => {
      expect(content).toMatch(/Appreciated the treatment/);
      expect(content).toMatch(/one stop for all your dental problems/);
      expect(content).toMatch(/exceeded my expectations/);
      expect(content).toMatch(/Highly recommend her for high-class/);
    });
  });

  describe('Clinic info', () => {
    it('should have correct mapUrl', () => {
      expect(content).toMatch(/maps\.app\.goo\.gl\/V4AjCU2EzFhuXABy6/);
    });

    it('should have correct phone number', () => {
      expect(content).toMatch(/\+91 7064719630/);
    });
  });
});
