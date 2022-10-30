import * as Toast from '@radix-ui/react-toast';

export function ToastRadix() {
    return (
        <Toast.Provider>
          <Toast.Root>
            <Toast.Title />
            <Toast.Description />
            <Toast.Action altText='Fechar notificação'/>
            <Toast.Close />
          </Toast.Root>
      
          <Toast.Viewport />
        </Toast.Provider>
      )
}
