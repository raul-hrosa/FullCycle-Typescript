import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import AddressChangedEvent from '../address-changed.event';

export default class EnviaConsoleLogHandler implements EventHandlerInterface{
    handle(event: AddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id} - ${event.eventData.name},  alterado para: ${event.eventData.address}.`)
    }
}