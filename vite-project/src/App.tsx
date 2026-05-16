import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
// import Users from "./components/users";
import {
  About,
  CafeExperience,
  CafeFooter,
  FeaturedMenu,
  HeroSection,
  Navbar,
} from './features/cafe/components'
// import { useBackendHealth } from "./hooks/useBackendHealth";

const queryClient = new QueryClient()

// function BackendUnavailableScreen({
//   isChecking,
//   onRetry,
// }: {
//   isChecking: boolean;
//   onRetry: () => void;
// }) {
//   return (
//     <main
//       className="min-h-svh bg-stone-950 px-6 text-stone-100"
//       role="alert"
//       aria-live="assertive"
//     >
//       <div className="mx-auto grid min-h-svh max-w-xl place-items-center text-center">
//         <div className="space-y-6">
//           <div className="mx-auto grid size-16 place-items-center rounded-full bg-amber-100 text-amber-950">
//             <span className="text-3xl" aria-hidden="true">
//               !
//             </span>
//           </div>
//           <div className="space-y-3">
//             <h1 className="font-serif text-4xl font-bold">
//               Backend unavailable
//             </h1>
//             <p className="text-stone-300">
//               The server cannot be reached right now. It may be starting up or
//               temporarily offline.
//             </p>
//           </div>
//           <button
//             className="rounded-md bg-amber-300 px-5 py-3 font-semibold text-stone-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
//             onClick={onRetry}
//             disabled={isChecking}
//             type="button"
//           >
//             {isChecking ? "Checking..." : "Try again"}
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }

function AppContent() {
  // const { isError, isFetching, isPending, refetch } = useBackendHealth();

  // if (isPending) {
  //   return (
  //     <main className="grid min-h-svh place-items-center bg-stone-100 px-6 text-center">
  //       <div className="space-y-3">
  //         <h1 className="font-serif text-4xl font-bold text-stone-950">
  //           Checking backend
  //         </h1>
  //         <p className="text-stone-600">Connecting to the server before loading the cafe.</p>
  //       </div>
  //     </main>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <BackendUnavailableScreen
  //       isChecking={isFetching}
  //       onRetry={() => {
  //         void refetch();
  //       }}
  //     />
  //   );
  // }

  return (
    <div className="min-h-svh bg-[#fbf7ef] text-stone-900">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedMenu />
        <About />
        <CafeExperience />
        {/* <Users /> */}
      </main>
      <CafeFooter />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App
