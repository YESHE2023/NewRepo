def cargar_inicial(codigos, parques, energia_mwh, fallos):
    # Se extienden las listas vacías con datos predefinidos para no iniciar en blanco
    codigos.extend(["S001", "S002", "S003", "S004", "S005", "S006", "S007", "S008"])
    parques.extend([
        "Sol Andino Norte", "Sol Andino Sur", "Luz Desierto I", "Luz Desierto II",
        "Costa Solar A", "Costa Solar B", "Sierra Solar X", "Sierra Solar Y"
    ])
    energia_mwh.extend([1250.0, 980.5, 860.3, 1320.7, 740.0, 915.2, 1105.5, 995.1])
    fallos.extend([9, 7, 12, 10, 6, 5, 8, 11])
    print("\nPortafolio inicial cargado correctamente.")


# 1. Mostrar portafolio
def mostrar_portafolio(codigos, parques, energia_mwh, fallos):
    print("=== PORTAFOLIO DE PARQUES – SOLARBRIGHT ENERGY ===")
    print("Código | Parque              | Energa (MWh) | Fallos")
    print("--------------------------------------------------------")
    # Se recorre el rango de la longitud de la lista para acceder a todas las listas paralelas por índice [i]
    for i in range(len(codigos)):
        # Uso de f-strings con formato de espaciado (ej. :<18) para alinear columnas
        print(f"{codigos[i]:<6} | {parques[i]:<18} | {energia_mwh[i]:<13.1f} | {fallos[i]}")
    print("\n--------------------------------------------------------")


# 2. Agregar parque
def agregar_parque(codigos, parques, energia_mwh, fallos):
    # Captura de datos por teclado
    codigo = input("Codigo del nuevo parque: ")
    nombre = input("Nombre del parque: ")
    # Conversión explicita de tipos (casting) a float e int
    energia = float(input("Energía generada (MWh): "))
    fallo = int(input("Número de fallos: "))
    
    # Se agrega la información a las 4 listas simultáneamente para mantener la integridad
    codigos.append(codigo) 
    parques.append(nombre)
    energia_mwh.append(energia)
    fallos.append(fallo)
    print("\n Parque agregado correctamente. ")


# 3. Eliminar por codigo
def eliminar_por_codigo(codigos, parques, energia_mwh, fallos):
    codigo = input("Codigo a eliminar: ")
    # Busqueda lineal para encontrar el índice del código
    for i in range(len(codigos)):
        if codigos[i] == codigo:
            # Al encontrarlo, se elimina el elemento en la posición 'i' de TODAS las listas
            codigos.pop(i)
            parques.pop(i)
            energia_mwh.pop(i)
            fallos.pop(i)
            print("\n Parque eliminado correctamente. ")
            return # Sale de la función tras eliminar para evitar errores de índice
    print("\n Codigo no encontrado. ")


# 4. Modificar por código
def modificar_por_codigo(codigos, parques, energia_mwh, fallos):
    codigo = input("Codigo a modificar: ")
    # Bucle para localizar el índice del parque
    for i in range(len(codigos)):
        if codigos[i] == codigo:
            # Menú interno para decidir qué campo específico actualizar
            print("¿Que desea modificar?")
            print("1. Nombre del parque")
            print("2. Energía generada")
            print("3. Fallos registrados")
            opcion = input("Opcion: ")
            
            if opcion == "1":
                parques[i] = input("Nuevo nombre: ") # Actualización directa por asignación
                print("\n Nombre actualizado correctamente. ")
            elif opcion == "2":
                energia_mwh[i] = float(input("Nueva energia (MWh): "))
                print("\nEnergia actualizada correctamente. ")
            elif opcion == "3":
                fallos[i] = int(input("Nuevo numero de fallos: "))
                print("\n Fallos actualizados correctamente. ")
            else:
                print("\nOpcion invalida. ")
            return # Finaliza la función tras la modificación
    print("\n Codigo no encontrado. ")


# 5. Buscar por nombre exacto
def buscar_por_nombre(codigos, parques, energia_mwh, fallos):
    nombre = input("Nombre exacto del parque: ")
    # Bucle que compara el string ingresado con los nombres en la lista 'parques'
    for i in range(len(parques)):
        if parques[i] == nombre:
            print("\nResultado de busqueda:")
            # Muestra los datos correspondientes al índice encontrado
            print("Codigo:", codigos[i])
            print("Parque:", parques[i])
            print("Energia (MWh):", energia_mwh[i])
            print("\n Fallos registrados:", fallos[i], )
            return
    print("\n No se encontro el parque indicado. ")


# 6. Reporte de rendimiento
def reporte_rendimiento(codigos, parques, energia_mwh, fallos):
    print("=== REPORTE DE RENDIMIENTO – SOLARBRIGHT ENERGY ===")
    print("Codigo | Parque            | Energía (MWh) | Fallos | Intensidad | Eficiencia (%)")
    print("-------------------------------------------------------------------------------")
    
    # Variables acumuladoras para el promedio final
    suma_eficiencia = 0
    contador = 0
    
    for i in range(len(codigos)):
        # Validación para evitar división por cero
        if energia_mwh[i] > 0:
            # Cálculo de lógica de negocio (KPIs)
            intensidad = (fallos[i] / energia_mwh[i]) * 100
            eficiencia = 100 - intensidad
            
            # Acumulación de valores para estadísticas
            suma_eficiencia += eficiencia
            contador += 1
            
            # Impresión formateada con decimales (.2f)
            print(f"{codigos[i]:<6} | {parques[i]:<17} | {energia_mwh[i]:<13.1f} | {fallos[i]:<6} | {intensidad:<10.2f} | {eficiencia:<12.2f}")
    
    # Calculo del promedio global solo si hubo datos válidos
    if contador > 0:
        prom_eficiencia = suma_eficiencia / contador
        print("-------------------------------------------------------------------------------")
        print(f"\nEficiencia promedio (estimada): {prom_eficiencia:.2f} % ")
    else:
        print("\nNo hay datos validos para calcular eficiencia. ")


# 7. Parque con mayor generacion
def mayor_generacion(codigos, parques, energia_mwh):
    # Verifica si la lista no está vacía
    if not energia_mwh:
        print("\n No hay datos. ")
        return
    # Función max() encuentra el valor más alto
    max_energia = max(energia_mwh)
    # .index() encuentra la posición de ese valor para obtener el nombre asociado
    indice = energia_mwh.index(max_energia)
    print(f"\nParque con mayor generacion: {parques[indice]} ({max_energia} MWh) ")


# 8. Parque con menor generacion
def menor_generacion(codigos, parques, energia_mwh):
    if not energia_mwh:
        print("\nNo hay datos. ")
        return
    # Función min() encuentra el valor más bajo
    min_energia = min(energia_mwh)
    indice = energia_mwh.index(min_energia)
    print(f"\nParque con menor generacion: {parques[indice]} ({min_energia} MWh) ")


# 9. Promedio de energia generada
def promedio_energia(energia_mwh):
    if len(energia_mwh) > 0:
        # Suma total dividida entre la cantidad de elementos
        promedio = sum(energia_mwh) / len(energia_mwh)
        print(f"\n Promedio general de energia: {promedio:.2f} MWh ")
    else:
        print("\n No hay datos disponibles. ")


# 10. Promedio de fallos
def promedio_fallos(fallos):
    if len(fallos) > 0:
        promedio = sum(fallos) / len(fallos)
        print(f"\nPromedio general de fallos: {promedio:.2f} ")
    else:
        print("\n No hay datos disponibles. ")


# 11. Totales del portafolio
def totales_portafolio(energia_mwh, fallos):
    # Función sum() para obtener totales acumulados de las listas
    total_e = sum(energia_mwh)
    total_f = sum(fallos)
    print(f"Total de energia generada: {total_e:.2f} MWh")
    print(f"\nTotal de fallos registrados: {total_f} ")


# -------------------- Menú Principal -------------------------

def menu():
    # Inicialización de las 4 listas principales vacías
    codigos = []
    parques = []
    energia_mwh = []
    fallos = []
    
    # Carga de datos de prueba
    cargar_inicial(codigos, parques, energia_mwh, fallos)

    # Bucle infinito para mantener el programa abierto
    while True:
        print("======== MENÚ PRINCIPAL – SOLARBRIGHT ENERGY ========")
        print("1. Mostrar portafolio")
        print("2. Agregar parque")
        print("3. Eliminar por codigo")
        print("4. Modificar por codigo")
        print("5. Buscar por nombre exacto")
        print("6. Reporte de rendimiento")
        print("7. Parque con mayor generacion")
        print("8. Parque con menor generacion")
        print("9. Promedio de energia generada")
        print("10. Promedio de fallos")
        print("11. Totales del portafolio")
        print("12. Salir")
        print("----------------------------------------------------")
        opcion = input("Seleccione una opcion: ")

        # Estructura condicional para dirigir a la función correspondiente
        if opcion == "1":
            mostrar_portafolio(codigos, parques, energia_mwh, fallos)
        elif opcion == "2":
            agregar_parque(codigos, parques, energia_mwh, fallos)
        elif opcion == "3":
            eliminar_por_codigo(codigos, parques, energia_mwh, fallos)
        elif opcion == "4":
            modificar_por_codigo(codigos, parques, energia_mwh, fallos)
        elif opcion == "5":
            buscar_por_nombre(codigos, parques, energia_mwh, fallos)
        elif opcion == "6":
            reporte_rendimiento(codigos, parques, energia_mwh, fallos)
        elif opcion == "7":
            mayor_generacion(codigos, parques, energia_mwh)
        elif opcion == "8":
            menor_generacion(codigos, parques, energia_mwh)
        elif opcion == "9":
            promedio_energia(energia_mwh)
        elif opcion == "10":
            promedio_fallos(fallos)
        elif opcion == "11":
            totales_portafolio(energia_mwh, fallos)
        elif opcion == "12":
            print("Gracias por usar el sistema SOLARBRIGHT ENERGY. Hasta pronto.")
            break # Rompe el bucle while y termina la ejecución
        else:
            print("\n Opción invalida. Intente nuevamente. ")


# ---------------------- Ejecución -----------------------------
# Llamada a la función principal que inicia todo
menu()
