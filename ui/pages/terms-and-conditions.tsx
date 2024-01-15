import { Card } from '@mantine/core'
import { AppLayout } from '../components/Layout/AppLayout'
import { AKExternalLink, AKTitle } from '../components/AKFramework'

export default function TermsAndConditions() {
  return (
    <>
      <Card p="lg">
        <AKTitle title="Terms and Conditions" />
      </Card>
      <Card p="lg">
        <AKTitle title="Last Updated: Jan 2024" />
        <p>
          Welcome to HiddenMe! This anonymous chat application is created solely for educational purposes.
          These Terms and Conditions govern your use of the Service. By using or accessing the Service, you acknowledge
          and agree to these terms.
        </p>
        <AKTitle title="1. License and Usage" />
        <p>
          You are granted a non-exclusive, revocable, worldwide, and royalty-free license to use, modify, and distribute
          the Service. However, as an educational project, we do not assume any responsibility for how the Service is
          used, and users must comply with applicable laws.
        </p>
        <AKTitle title="2. Warranty Disclaimer" />
        <p>
          The Service is provided "as is," as it is a proof-of-concept project created for educational purposes.
          We make no guarantees regarding the reliability, availability, or accuracy of the Service. You use the
          Service at your own risk.
        </p>
        <AKTitle title="3. Data and Usage Responsibility" />
        <p>
          This project is experimental, and while we aim to maintain data security, the proof-of-concept nature
          implies the possibility of data leaks. You acknowledge that you are solely responsible for any data you
          provide or share through the Service. We explicitly disclaim responsibility for any data loss, misuse,
          or unintended consequences arising from your participation in this educational proof-of-concept project.
        </p>
        <AKTitle title="4. Modifications" />
        <p>
          We reserve the right to modify or terminate the Service at any time without notice. It is your responsibility
          to check for changes to these terms, as they may be updated.
        </p>
        <AKTitle title="5. Contact" />
        <p>
          If you have any questions or concerns about these terms, please contact us through links bellow.
        </p>
        <AKExternalLink label="Sources on GitHub" href="https://github.com/zeinlol/hiddenme" />
        <AKExternalLink label="Author's LinkedIn" href="https://www.linkedin.com/in/nick-borshchov/" />
        <AKTitle title="Thank you for being a part of HiddenMe!" />
      </Card>
    </>
  )
}

TermsAndConditions.getLayout = (page: JSX.Element) => <AppLayout>{page}</AppLayout>
