import { describe, expect, test } from 'vitest';

import { generateEventUrl } from '../generate-event-url';

describe('Тесты для generateEventUrl', () => {
    test('Если не передали eventId - возвращает /', () => {
        expect(generateEventUrl('')).toBe('/');
    });

    test('Если передали eventId без customUrlParams - возвращает срез ссылки с pathname и query params + hash', () => {
        expect(generateEventUrl('3301', 'stream')).toBe(
            '/event?eventId=3301&enterType=stream&eventTypeId=3301',
        );
    });

    test('Если передали eventId c customUrlParams - возвращает срез ссылки с pathname и query params + hash', () => {
        expect(
            generateEventUrl('3301', 'stream', {
                playerId: '10',
                referer: 'sportradar',
                sessionToken: 'str',
            }),
        ).toBe(
            '/event?eventId=3301&enterType=stream&eventTypeId=3301&playerId=10&referer=sportradar&sessionToken=str',
        );
    });
});
