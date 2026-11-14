// Follow the numbered teaching parts in order. The full file combines every part.
using SharedRules;
// Import names from this library.
using System.Reflection;
// Import names from this library.
using System.Reflection.Emit;

// Display this result in the console.
Console.WriteLine($"Pass: {MarkRules.IsPass(70)}");
// Store type for the steps below.
Type type = typeof(MarkRules);
// Display this result in the console.
Console.WriteLine($"Type: {type.Name}");
// Store method for the steps below.
var method = type.GetMethod(nameof(MarkRules.IsPass))!;
// Display this result in the console.
Console.WriteLine($"Late binding: {method.Invoke(null, [40])}");
// Display this result in the console.
Console.WriteLine(type.GetCustomAttribute<StudyTopicAttribute>()!.Title);
// Store student for the steps below.
dynamic student = new System.Dynamic.ExpandoObject();
student.Name = "Lefa";
// Display this result in the console.
Console.WriteLine(student.Name);
// Reflection.Emit builds a method at runtime; it is not a C# source-code compiler.
var asm = AssemblyBuilder.DefineDynamicAssembly(new AssemblyName("GeneratedStudyRules"), AssemblyBuilderAccess.Run);
// Store module for the steps below.
var module = asm.DefineDynamicModule("Main");
// Store tb for the steps below.
var tb = module.DefineType("GeneratedRules", TypeAttributes.Public);
// Store mb for the steps below.
var mb = tb.DefineMethod("Seven", MethodAttributes.Public | MethodAttributes.Static, typeof(int), Type.EmptyTypes);
// Store il for the steps below.
var il = mb.GetILGenerator();
il.Emit(OpCodes.Ldc_I4_7);
il.Emit(OpCodes.Ret);
// Store generated for the steps below.
var generated = tb.CreateType()!;
// Display this result in the console.
Console.WriteLine($"Emitted result: {generated.GetMethod("Seven")!.Invoke(null, null)}");
