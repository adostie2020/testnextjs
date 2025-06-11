import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { Button } from '@/components/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-8 pt-8 text-center">
        <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl dark:from-gray-100 dark:to-gray-400">
          Smart Investment Solutions
        </h1>
        <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          Take control of your financial future with our comprehensive investment strategies
          tailored to your goals.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/about">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
          <h3 className="text-2xl font-bold">401(k) Management</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Optimize your retirement savings with expert guidance on employer-sponsored plans.
          </p>
          <Button variant="link" asChild className="mt-auto">
            <Link href="/blog">Learn about 401(k)s →</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
          <h3 className="text-2xl font-bold">IRA Strategies</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Maximize tax advantages with traditional and Roth IRA investment strategies.
          </p>
          <Button variant="link" asChild className="mt-auto">
            <Link href="/tags">Explore IRAs →</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
          <h3 className="text-2xl font-bold">Brokerage Accounts</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Build wealth through flexible investment options in taxable brokerage accounts.
          </p>
          <Button variant="link" asChild className="mt-auto">
            <Link href="/projects">View Options →</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="flex flex-col gap-8">
        <h2 className="text-center text-3xl font-bold">Why Choose Us</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Expert Guidance</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our team of financial advisors brings years of experience in wealth management and
              retirement planning.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Personalized Strategy</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We create customized investment plans that align with your unique financial goals and
              risk tolerance.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Comprehensive Solutions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              From retirement accounts to taxable investments, we offer a full range of financial
              services.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Transparent Approach</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in clear communication and full transparency in all our investment
              strategies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center gap-6 rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-900">
        <h2 className="text-3xl font-bold">Ready to Start Investing?</h2>
        <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          Take the first step towards a secure financial future. Schedule a consultation with our
          experts.
        </p>
        <Button size="lg" asChild>
          <Link href="/about">Contact Us Today</Link>
        </Button>
      </section>
    </div>
  )
}
