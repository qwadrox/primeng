import {
    ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    inject,
    model,
    ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from 'primeng/basecomponent';
import { ObjectUtils } from 'primeng/utils';
import { Tabs } from './tabs';

/**
 * TabPanel is a helper component for Tabs component.
 * @group Components
 */
@Component({
    selector: 'p-tabpanel',
    standalone: true,
    imports: [CommonModule],
    template: `@if (active()) {
        <ng-content></ng-content>
    }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-tabpanel]': 'true',
        '[class.p-component]': 'true',
        '[attr.data-pc-name]': '"tabpanel"',
        '[attr.id]': 'id()',
        '[attr.role]': '"tabpanel"',
        '[attr.aria-labelledby]': 'ariaLabelledby()',
        '[attr.data-p-active]': 'active()',
    },
})
export class TabPanel extends BaseComponent {
    pcTabs = inject(forwardRef(() => Tabs));

    value = model<string | number | undefined>(undefined);

    id = computed(() => `${this.pcTabs.id()}_tabpanel_${this.value()}`);

    ariaLabelledby = computed(() => `${this.pcTabs.id()}_tab_${this.value()}`);

    active = computed(() => ObjectUtils.equals(this.pcTabs.value(), this.value()));
}
