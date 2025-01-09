import { CompanyQuestions } from '@/components/company-questions'
import { loadCompanyQuestions, getCompanyQuestions } from '@/lib/company-utils'

export default async function FacebookProblemsPage() {
  const data = await loadCompanyQuestions();
  const facebookQuestions = getCompanyQuestions('Facebook', data);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 min-h-screen p-8 rounded-lg shadow-lg">
      <CompanyQuestions companyName="Facebook" questions={facebookQuestions} />
    </div>
  );
}

