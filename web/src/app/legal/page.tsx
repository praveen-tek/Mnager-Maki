"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Legal() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <Navbar/>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-black">Legal</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">Terms of Service</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Manger Maki, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>You agree to use this service only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the web.</li>
              <li>Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content or disrupting the normal flow of dialogue within our web site.</li>
              <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
              <li>We reserve the right to modify or discontinue this service at any time without notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our extension.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-black">Information We Collect</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Information you voluntarily provide (name, email, usage data)</li>
              <li>Automatically collected information (IP address, browser type, pages visited)</li>
              <li>Information from your device (operating system, unique identifiers)</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2 text-black">How We Use Your Information</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information for improving our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">Data Security</h2>
            <p className="text-gray-700">
              The security of your data is important to us, but no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">Third-Party Links</h2>
            <p className="text-gray-700">
              Our extension may contain links to third-party web sites. We are not responsible for the content, accuracy, or practices of these external sites. Your use of third-party websites is subject to their terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              Manger Maki is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no representations or warranties of any kind, express or implied, as to the operation of the extension or the information, content, or materials included in the extension.
            </p>
            <p className="text-gray-700">
              To the fullest extent permissible by applicable law, we disclaim all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">Limitation of Liability</h2>
            <p className="text-gray-700">
              In no event shall Manger Maki, its owners, or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Manger Maki.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">Intellectual Property Rights</h2>
            <p className="text-gray-700">
              Unless otherwise stated, Manger Maki and/or its licensors own the intellectual property rights for all material on the extension. All intellectual property rights are reserved. You may view and print pages from the extension for your personal use, subject to restrictions set in these terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">Changes to Legal Pages</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the extension. Your continued use of the extension following the posting of revised terms means that you accept and agree to the changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about these legal pages, please contact us at support@mangermaki.com
            </p>
          </section>

          <div className="text-sm text-gray-500 mt-12 pt-8 border-t">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>© 2026 Manger Maki. All rights reserved.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}