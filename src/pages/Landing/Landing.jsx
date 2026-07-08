import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Package,
  HeartHandshake,
  CheckCircle,
  BellRing,
  ShieldCheck,
  TrendingUp,
  Star
} from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer';
import styles from './Landing.module.css';

function Landing() {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      title: 'Join',
      text: 'Verify your address through our secure digital handshake process.'
    },
    {
      number: '02',
      title: 'Discover',
      text: 'Browse the neighbourhood feed for tools, help requests, or local events.'
    },
    {
      number: '03',
      title: 'Connect',
      text: 'Chat securely with neighbors through our encrypted messenger.'
    },
    {
      number: '04',
      title: 'Help',
      text: 'Share what you have or help where you can. Build your trust score.'
    }
  ];

  return (
    <>
      <Navbar />
      <Hero />

      {/* Community Impact Section */}
      <section className={`${styles.sectionPadding} ${styles.containerMax} ${styles.impactSection}`}>
        <p className={styles.impactSubtitle}>Our Local Impact</p>
        <h2 className={`${styles.impactTitle} font-section-title`}>
          Bringing neighbourhoods closer, <br />one knock at a time.
        </h2>
        <div className={styles.impactGrid}>
          <div className={styles.impactCol}>
            <div className={styles.impactIconWrapper}>
              <Users size={60} strokeWidth={1.5} />
            </div>
            <div className={`${styles.impactNumber} font-display-hero-mobile`}>12,400+</div>
            <p className={`${styles.impactText} font-body-xl`}>Families Connected</p>
          </div>
          <div className={styles.impactCol}>
            <div className={styles.impactIconWrapper}>
              <Package size={60} strokeWidth={1.5} />
            </div>
            <div className={`${styles.impactNumber} font-display-hero-mobile`}>45,000+</div>
            <p className={`${styles.impactText} font-body-xl`}>Items Shared</p>
          </div>
          <div className={styles.impactCol}>
            <div className={styles.impactIconWrapper}>
              <HeartHandshake size={60} strokeWidth={1.5} />
            </div>
            <div className={`${styles.impactNumber} font-display-hero-mobile`}>98%</div>
            <p className={`${styles.impactText} font-body-xl`}>Safety Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresWrapper} id="features">
        {/* Feature 1: Borrow Tools */}
        <div className={`${styles.sectionPadding} ${styles.containerMax} ${styles.featureRow}`}>
          <div className={styles.orderTextFirst}>
            <h3 className={`${styles.featureTitle} font-headline-lg`}>
              Need a tool? <br />Just ask next door.
            </h3>
            <p className={`${styles.featureDesc} font-body-xl`}>
              Why buy when you can borrow? Our inventory sharing system maps available tools and
              equipment in your immediate vicinity, making DIY easy and eco-friendly.
            </p>
            <ul className={styles.featureList}>
              <li className={styles.featureListItem}>
                <span className={styles.checkIcon}>
                  <CheckCircle size={20} />
                </span>
                Verified equipment listings
              </li>
              <li className={styles.featureListItem}>
                <span className={styles.checkIcon}>
                  <CheckCircle size={20} />
                </span>
                Integrated pick-up scheduling
              </li>
              <li className={styles.featureListItem}>
                <span className={styles.checkIcon}>
                  <CheckCircle size={20} />
                </span>
                Peer-to-peer insurance coverage
              </li>
            </ul>
            <button onClick={() => navigate('/marketplace')} className={`${styles.featureBtn} btn-transition`}>
              Explore the Garage
            </button>
          </div>
          <div className={`${styles.featureImgContainer} ${styles.orderImgSecond}`}>
            <img
              alt="Borrow Tools Section"
              className={styles.featureImg}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1IDrDk0OmlOicEPjcRmwefg5pQ5bFIXpTRh3QG1-cWiwiwLus4wBYbggpNJiXV6QNeUQr-H1ikvMmjPJpucqeqAPdihJYKrE0EXmAoIvyrlo-B7cXTSIpvt1kE8U7fu0WVyAM2hj70KgwbYiF8F_wBc1P1OlHSXdgD2Pe2iR9xISquHCQsechJByMHHrIYZneH3ea70Z9RmGhcS3y51czAlCGnu3sYPvEGgOJQ4yiVVXp9mdHFaWp8Q"
            />
          </div>
        </div>

        {/* Feature 2: Emergency Help */}
        <div className={styles.emergencyBg}>
          <div className={`${styles.sectionPadding} ${styles.containerMax} ${styles.featureRow}`}>
            <div className={styles.featureImgContainer}>
              <img
                alt="Emergency Help Section"
                className={styles.featureImg}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPGYuZeH6zdyMNqdpqJOpPWK0qHO2F3GoVWPYJv-0BMQUipx7p5iy5x8TFcJcTixbH9uSwXk9uZtocvATiLCIpUL4pJ-GXO-KGLQMi9QWTvT0ejO4ubAT9k1M5RS31bHzdOouPgpu6UJa2263Bdq1_iEgmSHmYwRlOdvamyUZAp1djvaSlIEoB_WVNzlVVkFCMklb3BrDCnZZqk98fO83rb7HJVzd6uXvOMHsGDoLkBENBMW21I0vtsw"
              />
            </div>
            <div>
              <h3 className={`${styles.featureTitle} font-headline-lg`}>
                A help signal <br />for peace of mind.
              </h3>
              <p className={`${styles.featureDesc} font-body-xl`}>
                In small emergencies—a flat tire, a medical question, or just a heavy furniture
                lift—the fastest help is often across the street.
              </p>
              <div className={styles.emergencyGrid}>
                <div className={`${styles.emergencyCard} glass-panel`}>
                  <span className={styles.emergencyCardIcon}>
                    <BellRing size={40} />
                  </span>
                  <p className="font-label-md">Instant Alerts</p>
                </div>
                <div className={`${styles.emergencyCard} glass-panel`}>
                  <span className={styles.emergencyCardIcon}>
                    <ShieldCheck size={40} />
                  </span>
                  <p className="font-label-md">Vetted Responders</p>
                </div>
              </div>
              <button onClick={() => navigate('/settings')} className={`${styles.featureBtn} btn-transition`}>
                See How It Works
              </button>
            </div>
          </div>
        </div>

        {/* Feature 3: Lost & Found */}
        <div className={`${styles.sectionPadding} ${styles.containerMax} ${styles.featureRow}`}>
          <div className={styles.orderTextFirst}>
            <h3 className={`${styles.featureTitle} font-headline-lg`}>
              Bringing them <br />back home safely.
            </h3>
            <p className={`${styles.featureDesc} font-body-xl`}>
              Our community-powered lost and found alerts reach every phone in the neighborhood
              instantly. Whether it's a runaway golden retriever or a lost wallet, we've got eyes
              everywhere.
            </p>
            <div className={`${styles.avatarOverlapGroup} glass-panel`}>
              <div className={styles.avatarStack}>
                <div className={styles.avatarItem}></div>
                <div className={styles.avatarItem}></div>
                <div className={styles.avatarItem}></div>
              </div>
              <p className={styles.avatarStackText}>40 neighbors searching right now</p>
            </div>
            <button onClick={() => navigate('/create-knock')} className={`${styles.featureBtn} btn-transition`}>
              Report an Issue
            </button>
          </div>
          <div className={`${styles.featureImgContainer} ${styles.orderImgSecond}`}>
            <img
              alt="Lost and Found Section"
              className={styles.featureImg}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyw5AoIzBMqin_wlC0qKPbjjA6wO38Se62w_UAU4hfYC2NgVmF8DDaHpQnURgbAwIDG5AwYhgLvagoJ1D_QYsfouLQjRBeeN87bTCwtkVkPxm291hzo5IstlkWoztJZUnMwWHESnZjH0stMSDssbM1pTrquS5h15qd6PF3MoIKbBywMrxbOze7ATI_V5LaF47NNYFKq4yfxY-LTg7C-gh5cuNtHHAdX0_bA6nn7JsM-yFyRk13wvgzog"
            />
          </div>
        </div>
      </section>

      {/* Explore Map Section */}
      <section className={`${styles.sectionPadding} ${styles.containerMax}`} id="explore">
        <div className={styles.mapTitleContainer}>
          <h2 className="font-section-title">Explore your world.</h2>
          <p className={`${styles.mapDesc} font-body-xl`}>
            See real-time activity and available resources around you. Our interactive map is your
            guide to a better neighborhood.
          </p>
        </div>
        <div className={styles.mapPreviewContainer}>
          <img
            alt="Interactive Map Preview"
            className={styles.mapImg}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzw26_sTVFgZkxbrImJVIlUJS7OJjabfhqSGSJh_vNou3_oM0ddMmL_4JISnXvgCzFoixUzfMT54QrSfdub-CckIUQ8XrLrKHXNIPjc0EvgrrT5Wu0NmR92HmQYgZ8BjV3Sszvoe4pebh4LF3MjU78teZ5ceVMcXZRzizMFjlb7gPbyVhl2_Htx-C04MCIeok6pkCUYfTQdPGEPSjzhjjh8ycaun0QodzpfHKobUKMBT99ZPhm95DHDg"
          />
          <div className={styles.mapOverlay}></div>
          <div className={`${styles.mapGlassPanel} glass-panel`}>
            <h4 className={`${styles.mapCardTitle} font-headline-lg-mobile`}>Live Heatmap</h4>
            <p className={styles.mapCardText}>
              Real-time indicators of neighborhood trust and activity.
            </p>
            <button onClick={() => navigate('/marketplace')} className={`${styles.mapBtn} btn-transition`}>
              Open Full Map
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`${styles.sectionPadding} ${styles.howItWorksBg}`} id="community">
        <div className={styles.containerMax}>
          <div className={styles.howItWorksHeaderGrid}>
            <h2 className="font-display-hero-mobile">How it works. <br />Simple. Human. Safe.</h2>
            <div className={styles.howItWorksDescWrapper}>
              <p className={`${styles.howItWorksDesc} font-body-xl`}>
                We've streamlined the way you connect with your community while maintaining the
                highest privacy standards.
              </p>
            </div>
          </div>
          <div className={styles.stepsGrid}>
            <div className={styles.connectLine}></div>
            {steps.map((step, idx) => (
              <div key={idx} className={styles.stepCol}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed for Trust Section */}
      <section className={`${styles.sectionPadding} ${styles.containerMax}`}>
        <div className={styles.trustGrid}>
          <div>
            <h2 className={`${styles.trustTitle} font-section-title`}>Designed for Trust.</h2>
            <p className={`${styles.trustDesc} font-body-xl`}>
              Your safety is our priority. Every 'Knocker' is verified, and our peer-review system
              ensures accountability in every interaction.
            </p>
            <div className={styles.trustFeaturesList}>
              <div className={styles.trustFeatureItem}>
                <div className={styles.trustFeatureIcon}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h5 className={styles.trustFeatureTitle}>Verified Neighbors</h5>
                  <p className={styles.trustFeatureText}>
                    Strict residential address verification for every single user.
                  </p>
                </div>
              </div>
              <div className={styles.trustFeatureItem}>
                <div className={styles.trustFeatureIcon}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h5 className={styles.trustFeatureTitle}>Trust Score System</h5>
                  <p className={styles.trustFeatureText}>
                    Build credibility through positive community interactions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sarah J. Trust Profile Card Mockup */}
          <div className={`${styles.trustCard} glass-panel`}>
            <div className={styles.trustCardHeader}>
              <div className={styles.trustCardAvatarWrapper}>
                <div className={styles.trustCardAvatar}></div>
              </div>
              <div>
                <h4 className={`${styles.trustCardName} font-headline-lg-mobile`}>Sarah J.</h4>
                <p className={styles.trustCardSub}>Top Contributor • Maple Street</p>
              </div>
              <div className={styles.trustCardRating}>
                <Star size={20} fill="var(--color-primary)" stroke="none" /> 4.9
              </div>
            </div>
            <div className={styles.trustSliders}>
              <div>
                <div className={styles.trustSliderHeader}>
                  <span>Helpfulness Score</span>
                  <span>94%</span>
                </div>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill1}></div>
                </div>
              </div>
              <div>
                <div className={styles.trustSliderHeader}>
                  <span>Community Reliability</span>
                  <span>98%</span>
                </div>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill2}></div>
                </div>
              </div>
            </div>
            <div className={styles.trustStatsGrid}>
              <div className={styles.trustStatCard}>
                <p className={styles.trustStatLabel}>Items Loaned</p>
                <p className={styles.trustStatNumber}>42</p>
              </div>
              <div className={styles.trustStatCard}>
                <p className={styles.trustStatLabel}>Help Requests</p>
                <p className={styles.trustStatNumber}>12</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voices from the block Section (Testimonials) */}
      <section className={`${styles.sectionPadding} ${styles.testimonialsBg}`}>
        <div className={styles.containerMax}>
          <h2 className={`${styles.testimonialsTitle} font-section-title`}>
            Voices from the block.
          </h2>
          <div className={styles.testimonialsGrid}>
            {/* Testimonial 1 */}
            <div className={`${styles.testimonialCard} glass-panel animate-float`}>
              <div className={styles.testimonialHeader}>
                <div className={styles.testimonialAvatar}></div>
                <div>
                  <p className={styles.testimonialName}>David Chen</p>
                  <span className={styles.testimonialBadge}>Riverside Estates</span>
                </div>
              </div>
              <p className={styles.testimonialQuote}>
                "I borrowed a lawnmower when mine broke down, and ended up making a new best friend.
                This app is more than just tools; it's about the people."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className={`${styles.testimonialCard} glass-panel animate-float-delayed`}>
              <div className={styles.testimonialHeader}>
                <div className={styles.testimonialAvatar}></div>
                <div>
                  <p className={styles.testimonialName}>Emma Watson</p>
                  <span className={styles.testimonialBadge}>Willow Creek</span>
                </div>
              </div>
              <p className={styles.testimonialQuote}>
                "When our cat went missing, the whole neighborhood was alert within minutes. We
                found him in three hours. Truly a lifesaver!"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className={`${styles.testimonialCard} glass-panel animate-float`}>
              <div className={styles.testimonialHeader}>
                <div className={styles.testimonialAvatar}></div>
                <div>
                  <p className={styles.testimonialName}>Marcus Thorne</p>
                  <span className={styles.testimonialBadge}>Old Town</span>
                </div>
              </div>
              <p className={styles.testimonialQuote}>
                "The verification process gave me the confidence to offer my garage space for
                storage. The trust levels here are unmatched."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg}>
          <div className={styles.ctaOverlay}></div>
          <img
            alt="Final CTA Background"
            className={styles.ctaImg}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_O4DucSDkKxGD6LZUuxyXeVPf_CkMWiQ1owxm13r5Y4WmHi3e7B1hYF7RWAjC2AaqzXLS0eTmI4Djmfc97ufJ-AbvS6gPDf4yvz3CTf8MxoXQwSjB5dcN4EaDW39V_IfiQNhIw3HgQxZ14ci6BR_bkosLV-Qb5eB5qoQ4NZKU-HsEhErQ0GLOFiNVqDGyQpeawEw-LNvgStqswpfMSFpkUZu6zR7kZsYu2YT908rLoALlRHn44amR1w"
          />
        </div>
        <div className={styles.ctaContent}>
          <h2 className={`${styles.ctaTitle} font-display-hero-mobile font-headline-lg`}>
            Imagine a neighborhood where <br />everyone helps everyone.
          </h2>
          <div className={styles.ctaButtons}>
            <button onClick={() => navigate('/register')} className={`${styles.ctaPrimaryBtn} btn-transition`}>
              Start Your Community
            </button>
            <button onClick={() => navigate('/settings')} className={`${styles.ctaSecondaryBtn} btn-transition`}>
              Learn About Security
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Landing;
